import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "src/context/ThemeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "../../lib/validations"; // You might need to create this schema
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function AnswerEdit() {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const { id } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const store = useSelector((store) => store.answer);
  const answers = useSelector((store) => store.answer.userAnswers);
  console.log("AnswersP", answers);
  const loading = useSelector((store) => store.loading);
  const error = useSelector((store) => store.error);

  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_ANSWER_DETAILS", payload: { id } });
  }, [id, dispatch]);

  useEffect(() => {
    if (answers && answers.length > 0) {
      setContent(answers[0].content);
    }
}, [answers]);


  const form = useForm({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: content,
    },
  });

  function onSubmit(values) {
    console.log("onsubmit", values);
    dispatch({
      type: "EDIT_ANSWER_REQUEST",
      payload: {
        id,
        ...values,
      },
    });

    navigate("/home");
  }
  console.log("Redux Store Answers:", answers);
  console.log("Local State Content:", content);
  
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
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your answer
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.REACT_APP_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={content}
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
                  Introduce the answer and provide a detailed explanation.
                  Minimum 20 characters.
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
                title: "Answer edited successfully",
                description: "Your answer has been edited successfully",
              })
            }}
          >
            {isSubmitting ? "Editing..." : "Edit Answer"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default AnswerEdit;
