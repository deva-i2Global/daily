export default function Home() {
  return (
    <div className="h-dvh w-dvw grid place-content-center">
      <form className="grid gap-3" method="GET" action="/admin/meet">
        <input
          type="text"
          name="room_id"
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter room ID"
          
        />
        <input  
          type="text"
          name="name"
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
        />
        <button type="submit" className="">
          Join Meeting
        </button>
      </form>
    </div>
  );
}
