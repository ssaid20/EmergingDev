import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "src/context/ThemeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionsSchema } from "../../lib/validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

const type = "create";
function QuestionEdit() {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const { id } = useParams(); // Get the question ID from the URL if it exists
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionDetails = useSelector(
    (store) => store.question.questionDetails[0]
  );
  const store = useSelector((store) => store.question);

  const loading = useSelector((store) => store.loading);
  const error = useSelector((store) => store.error);
  //dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });

  // Access the question details from the Redux store

  console.log("details", questionDetails);

  // Local state for the form fields
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });
  }, [id, dispatch]);

  useEffect(() => {
    console.log("inside questionD", questionDetails);
    if (questionDetails) {
        console.log("inside IF questionD", questionDetails);
        setTitle(questionDetails.title);
        setExplanation(questionDetails.content);
        console.log("explana", explanation)
      setTags(questionDetails.tags);
    }
  }, [questionDetails]);
// if (!questionDetails){
//     return
// }
  const form = useForm({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
    //   title: "",
    //   explanation: "",
    //   tags: [],
       title: title,
        explanation: explanation,
        tags: tags,
    },
  });

  // Handler for form submission
  function onSubmit(values) {
    console.log("onsubmit", explanation);
    // const values = {
    //   title,
    //   explanation,
    //   tags,
    // };

    // Dispatch an action to update the existing question
    dispatch({
      type: "EDIT_QUESTION_REQUEST",
      payload: {
        id,
        ...values,
      },
    });

    // // Dispatch an action to create a new question
    // dispatch({ type: "POST_QUESTION_REQUEST", payload: values });

    navigate("/home");
  }

  // Handler for adding tags on pressing 'Enter'
  const handleInputKeyDown = (event, field) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();

      const tagInput = event.target;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  // Handler for removing tags
  const handleTagRemove = (tag, field) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
  };
  console.log("Explanation ", explanation);
console.log("title",title)
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    value={title} // Bind to the local state
                    onChange={(e) => setTitle(e.target.value)} // Update the state on change
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    // value={explanation} // Bind to the local state
                    apiKey={process.env.REACT_APP_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)} // Update the state on change
                    initialValue={explanation}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="Add tags..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag) => (
                          <Badge
                            key={tag}
                            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            {tag}
                            <img
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={store.isSubmitting}
            onClick={() => {
              toast({
                title: "Question posted successfully",
                description: "Your question has been posted successfully",
              })
            }}
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Editing..." : "Posting..."}</>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default QuestionEdit;
