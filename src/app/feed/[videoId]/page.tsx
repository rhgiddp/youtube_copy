
interface PageProps {
    params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;
  
  console.log("서버 컴포넌트: {videoId}") 

  return (
    <div>
      Video Id : {videoId}      
    </div>
  )
}

export default Page;