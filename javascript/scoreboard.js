import { db } from "./firebaseConfig.js"
import { ref, query, orderByChild, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";


const boggleHighScoresList = document.getElementById('boggleHighScoresList');
const boggleHighScores = [];
const limit = 10; // top 10 users will be displayed

boggleHighScoresList.innerHTML = "<p>LOADING....</p>"

const fetchScores = async () => {
    const dbRef = query(ref(db, 'allScores'), orderByChild('score'), limitToLast(limit));
    await onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            boggleHighScores.push(data);
            // console.log(data);
          });

        //   console.log(boggleHighScores);
        boggleHighScores.reverse();

        boggleHighScoresList.innerHTML = 
        boggleHighScores.map(score => {
            return `<tr class="high-score">
                        <td class="individual-score">${score.name}</td>
                        <td class="individual-score">${score.wordsFound}</td>
                        <td class="individual-score">${score.score}</td>
                    </tr>`
        }).join("");

    })


}

fetchScores();






