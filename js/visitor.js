const visitorCountElement = document.getElementById("visitorCount");
const firebaseConfig = {
    apiKey: "AIzaSyBkt6cCoiYIQvsn_OrtBUyYMy2ntH1_qNI",
    authDomain: "counter-7f7c7.firebaseapp.com",
    projectId: "counter-7f7c7",
    storageBucket: "counter-7f7c7.appspot.com",
    messagingSenderId: "13493280600",
    appId: "1:13493280600:web:b64d63add7b97129ca0f2d"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
// Get the document reference
const counterDocRef = db.collection("counter").doc("XwjPZQTsT0HIp5meWmM5");

// Update the count using a transaction
db.runTransaction((transaction) => {
    return transaction.get(counterDocRef).then((doc) => {
        if (doc.exists) {
            const newCount = doc.data().count + 1;
            transaction.update(counterDocRef, { count: newCount });
        } else {
            transaction.set(counterDocRef, { count: 1 });
        }
    });
}).then(() => {
    console.log("Visitor count updated successfully!");
}).catch((error) => {
    console.log("Error updating visitor count: ", error);
});

counterDocRef.onSnapshot((doc) => {
    if (doc.exists) {
        const count = doc.data().count;
        visitorCountElement.textContent = count;
    }
});
