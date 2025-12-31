import MeetingCall from "@/components/MeetingCall";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Meeting = async (props: Props) => {
  const { room_id,name } = await props.searchParams;
  return (
    <div>
      <MeetingCall roomId={room_id as string} role="admin" name={name as string} />
    </div>
  );
};

export default Meeting;
