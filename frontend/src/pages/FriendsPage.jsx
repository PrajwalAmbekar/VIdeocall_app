import { useEffect, useState } from "react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { getUserFriends } from "../lib/api.js"; // you already have this

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Friends</h1>

      {loading ? (
        <p className="text-base-content">Loading friends...</p>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
