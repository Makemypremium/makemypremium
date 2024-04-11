"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { BASEURL } from "@/app/config/app";
import { toBase64 } from "@/lib/utils";
import Image from "next/image";
import { EditorState } from "draft-js";

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  logo: z.string(),
  cover: z.string(),
  prices: z.array(
    z.object({
      period: z.any(),
      value: z.any(),
    })
  ),
  featured: z.boolean(),
  status: z.boolean(),
});

const AppForm = ({ type = "create", data = null }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: null,
      cover: null,
      prices: [],
      featured: false,
      status: true,
    },
  });

  const prices = useFieldArray({ control: form.control, name: "prices" });

  const onSubmit = async (formData) => {
    setLoading(true);

    const url = type === "update" ? `app/${data?._id}/update` : `app/create`;
    const method = type === "update" ? "PUT" : "POST";

    try {
      const res = await fetch(`${BASEURL}/${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create app");

      toast({
        description:
          type === "update"
            ? "App updated succesfully"
            : "App created succesfully",
      });
      router.refresh();
      router.push("/apps");
    } catch (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e, field) =>
    toBase64(e.target.files[0], (result) => form.setValue(field, result));

  useEffect(() => {
    if (type === "update" && data) form.reset(data);
  }, [data, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-3">
              {form.watch("logo") && (
                <Image src={form.watch("logo")} width={62} height={62} />
              )}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => onFileChange(e, "logo")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-3">
              {form.watch("cover") && (
                <Image src={form.watch("cover")} width={62} height={62} />
              )}
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => onFileChange(e, "cover")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      className="mt-1 p-2"
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured?</FormLabel>
                    <FormDescription>
                      Is App featured for home screen?
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() =>
                prices.append({
                  period: "",
                  value: "",
                })
              }
            >
              Add Price Variant
            </Button>

            {prices.fields.map((price, index) => (
              <Card key={price.id} className="mb-2">
                <CardContent className="flex items-center p-4 ">
                  <div className="w-full grid grid-cols-2 gap-2 mr-1">
                    <FormField
                      control={form.control}
                      name={`prices.[${index}].period`}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Number of months"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`prices.[${index}].value`}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Price"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    onClick={() => prices.remove(index)}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AppForm;
