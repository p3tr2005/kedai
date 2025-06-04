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
import { loginSchema, loginSchemaType } from "@/lib/schemas";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";

function LoginPage() {
  const form = useForm<loginSchemaType>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: loginSchemaType) => {};

  return (
    <main className="w-screen h-screen bg-zinc-100 pt-36">
      <section className="w-[600px] h-max pb-8 mx-auto bg-white rounded-md p-6">
        <h1 className="text-4xl font-semibold text-center">Login</h1>

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
                    Be careful when set a username.
                  </FormDescription>
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
              Submit
            </Button>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-zinc-600 ">
              <p>Don&apos;t have an account?</p>

              <Link
                to="/register"
                className="font-semibold underline text-black"
              >
                Create Account
              </Link>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}

export default LoginPage;
