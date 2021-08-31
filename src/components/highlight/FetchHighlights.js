import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

export default function FetchHighlights({
  uid,
  sourceId,
  bookCode,
  chapter,
  setHighlights,
}) {
  useFirebaseConnect(
    `users/${uid}/highlights/${sourceId}/${bookCode}/${chapter}`
  );
  const data =
    useSelector(
      ({ firebase: { data } }) =>
        data.users &&
        data.users[uid] &&
        data.users[uid].highlights &&
        data.users[uid].highlights[sourceId] &&
        data.users[uid].highlights[sourceId][bookCode] &&
        data.users[uid].highlights[sourceId][bookCode][chapter]
    ) || [];
  useEffect(() => {
    setHighlights(data);
  }, [data, setHighlights]);
  return <></>;
}
