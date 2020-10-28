import { db } from "./firebase";

//"get"

getFirebase() {
    db.collection("produkty")
      .get()
      .then((snapshot) => {
        const documents = [];
        let i = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          documents.push(data);
          i += 1;
        });
        this.setState({ documents: documents });
      })
      .catch((error) => {
        alert("Nie można pobrać listy produktów - odśwież stronę", error);
      });
  }
  