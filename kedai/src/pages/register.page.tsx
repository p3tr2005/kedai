import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { registerSchema, registerSchemaType } from "@/lib/schemas";
import { Separator } from "@/ui/components/separator";
import { Link } from "react-router";

function RegisterPage() {
  const form = useForm<registerSchemaType>({
    resolver: valibotResolver(registerSchema),
    defaultValues: {
      name: "",
      role: "USER" as const,
      password: "",
    },
  });

  const onSubmit = (values: registerSchemaType) => {};

  return (
    <main className="w-screen h-screen bg-zinc-100 pt-36">
      <section className="w-[600px] h-max pb-8 mx-auto bg-white rounded-md p-6">
        <h1 className="text-4xl font-semibold text-center">Create Account</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g yasmin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Be careful when se t a username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-normal">Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role for your account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>You can manage role</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="***********" {...field} />
                  </FormControl>
                  <FormDescription>Type a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full p-6" type="submit" size="lg">
              Create Account
            </Button>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-zinc-600 ">
              <p>Already have an account?</p>

              <Link to="/login" className="font-semibold underline text-black">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}

export default RegisterPage;
