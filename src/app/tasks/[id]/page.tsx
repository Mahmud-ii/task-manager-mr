"use client";
import { Col } from "@/app/components/layouts";
import EditTaskForm from "@/app/components/layouts/EditTaskForm";
import Spinner from "@/app/components/ui/Spinner";
import { useGetSingleTaskQuery } from "@/lib/features/apiTask";

export default function PostPage({ params }) {
  const { id } = params;
  const { data: singleProduct, isSuccess } = useGetSingleTaskQuery(id);

  return (
    <>
      {isSuccess ? (
        <EditTaskForm singleProduct={singleProduct} id={id} />
      ) : (
        <Col className=" w-2/5 max-h-[95vh] mx-auto bg-bgGray py-6 px-4 rounded-xl flex flex-col sm:w-4/5 sm:absolute sm:top-0 sm:bottom-0 sm:min-h-screen sm:right-0 sm:rounded-r-none sm:rounded-b-none">
          <Spinner />
        </Col>
      )}
    </>
  );
}
