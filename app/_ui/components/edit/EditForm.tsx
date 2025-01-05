import parseArticleHtml from "@/lib/parseArticleHtml";

interface EditFormProps {
  htmlContent : string;
}

const EditForm = ({htmlContent} : EditFormProps) => {
  console.log(parseArticleHtml(htmlContent));
  return (
    <div></div>
  );
}
export default EditForm;