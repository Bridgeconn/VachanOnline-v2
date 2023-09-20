import React from "react";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function GetChapterNotes({
  uid,
  sourceId,
  bookCode,
  chapter,
  setNotes,
  setNotesText,
}) {
  //Get notes for this chapter from firebase
  useFirebaseConnect(`users/${uid}/notes/${sourceId}/${bookCode}/${chapter}`);
  const notes = useSelector(
    ({ firebase: { data } }) =>
      data.users &&
      data.users[uid] &&
      data.users[uid].notes &&
      data.users[uid].notes[sourceId] &&
      data.users[uid].notes[sourceId][bookCode] &&
      data.users[uid].notes[sourceId][bookCode][chapter]
  );

  //When data comes from firebase put in noteList
  React.useEffect(() => {
    if (isLoaded(notes) && !isEmpty(notes)) {
      let list = [];
      if (notes) {
        notes.forEach((note) => {
          list = list.concat(note.verses);
        });
      }
      list.sort();
      list = [...new Set(list)];
      setNotes(list);
      setNotesText(notes);
    } else {
      setNotes([]);
      setNotesText([]);
    }
  }, [notes, setNotes, setNotesText]);
  return <></>;
}
