import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../../lib/validations";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  import { Textarea } from "../ui/textarea"
  import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast"

const ProfileEdit = () => {
  const user = useSelector((store) => store.user); // Get the user from the store
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      githublink: user.githublink || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = (values) => {
    setIsSubmitting(true);
    dispatch({ type: "EDIT_PROFILE_REQUEST", payload: values });
    navigate("/user");
    setIsSubmitting(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full flex-col gap-9">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your username" 
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githublink"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                GitHub Link
              </FormLabel>
              <FormControl>
                <Input 
                  type="url"
                  placeholder="Your github URL" 
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel>
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What's special about you?" 
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button type="submit" className="primary-gradient w-fit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
            onClick={() => {
              toast({
                title: "Profile updated successfully",
                description: "Your profile has been updated successfully",
              })
            }}
          </Button>
        </div>
      </form>
    </Form>
  )
};

export default ProfileEdit;