import { collection, DocumentData, onSnapshot, Query, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebase';

interface Channels {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {

  const [documents, setDocuments] = useState<Channels[]>([]);

  const collectionRef: Query<DocumentData> = query(collection(db, "channels"));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) => channelsResults.push({
        id: doc.id,
        channel: doc.data()
      }));
      setDocuments(channelsResults);
    });
  }, []);

  return { documents }
}

export default useCollection