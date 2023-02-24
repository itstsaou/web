// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

/*
For stroke animation:
https://www.cassie.codes/posts/creating-my-logo-animation/
*/

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwmb8vgK0Bi5sgmyHa3Rm6FuHyEEeY78w",
  authDomain: "thai-student-assoc.firebaseapp.com",
  projectId: "thai-student-assoc",
  storageBucket: "thai-student-assoc.appspot.com",
  messagingSenderId: "813535396713",
  appId: "1:813535396713:web:f55ce49234a15038c833f8",
  measurementId: "G-43GJZF4RC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// from https://blog.bitsrc.io/debounce-understand-and-learn-how-to-use-this-essential-javascript-skill-9db0c9afbfc1
function debounce(func, delay = 250) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

async function init() {
  const querySnapshot = await getDocs(collection(db, "names"));
  let nameList = new Array();
  querySnapshot.forEach((doc) => {
    nameList.push(doc.data());
  });

  const nameList2 = [
    { engName: "Fiona", thName: "ฟีโอน่า" },
    { engName: "James", thName: "เจมส์" },
    { engName: "Robert", thName: "โรเบิร์ท" },
    { engName: "John", thName: "จอน" },
    { engName: "Michael", thName: "ไมเคิล" },
    //
    { engName: "David", thName: "เดวิด" },
    { engName: "William", thName: "วิวเลียม" },
    { engName: "Richard", thName: "ริชาจ" },
    { engName: "Joseph", thName: "โจเซฟ" },
    { engName: "Thomas", thName: "โทมาส" },
    { engName: "Charles", thName: "ชาล" },
    { engName: "Christopher", thName: "คริสโตเฟอร์" },
    { engName: "Daniel", thName: "เดเนียล" },
    { engName: "Matthew", thName: "แมททิว" },
    { engName: "Anthony", thName: "แอนโทนี่" },
    { engName: "Mark", thName: "มาร์ค" },
    { engName: "Donald", thName: "โดแนล" },
    { engName: "Steven", thName: "สตีเวน" },
    { engName: "Paul", thName: "พอล" },
    { engName: "Andrew", thName: "แอนดรูว" },
    { engName: "Joshua", thName: "จอซ" },
    { engName: "Kenneth", thName: "" },
    { engName: "Kevin", thName: "เควิน" },
    { engName: "Brian", thName: "" },
    { engName: "George", thName: "จอร์จ" },
    { engName: "Timothy", thName: "ทิมอที้" },
    { engName: "Ronald", thName: "โรนอล" },
    { engName: "Edward", thName: "เอ็ดเวิร์ด" },
    { engName: "Jason", thName: "เจสัน" },
    { engName: "Jeffrey", thName: "เจฟเฟอรี่" },
    { engName: "Ryan", thName: "ไรอัน" },
    { engName: "Jacob", thName: "เจคอบ" },
    { engName: "Gary", thName: "แกรี่" },
    { engName: "Nicholas", thName: "นิโคลัส" },
    { engName: "Eric", thName: "อีริค" },
    { engName: "Jonathan", thName: "โจนาทาน" },
    { engName: "Stephen", thName: "สตีเฟน" },
    { engName: "Larry", thName: "" },
    { engName: "Justin", thName: "จัสติน" },
    { engName: "Scott", thName: "สกอตส์" },
    { engName: "Brandon", thName: "แบรนดอน" },
    { engName: "Benjamin", thName: "เบนจามิน" },
    { engName: "Samuel", thName: "แซมมูเอล" },
    { engName: "Gregory", thName: "" },
    { engName: "Alexander", thName: "อเล็กซานเดอร์" },
    { engName: "Frank", thName: "แฟรค์" },
    { engName: "Patrick", thName: "" },
    { engName: "Raymond", thName: "เรมอน" },
    { engName: "Jack", thName: "" },
    { engName: "Dennis", thName: "" },
    { engName: "Jerry", thName: "" },
    { engName: "Tyler", thName: "ไทเรอร์" },
    { engName: "Aaron", thName: "แอรอน" },
    { engName: "Jose", thName: "" },
    { engName: "Adam", thName: "อดัม" },
    { engName: "Nathan", thName: "นาทาน" },
    { engName: "Henry", thName: "เฮ็นรี่" },
    { engName: "Douglas", thName: "" },
    { engName: "Zachary", thName: "แซคเคอรี่" },
    { engName: "Peter", thName: "" },
    { engName: "Kyle", thName: "" },
    { engName: "Ethan", thName: "" },
    { engName: "Walter", thName: "" },
    { engName: "Noah", thName: "โนอา" },
    { engName: "Jeremy", thName: "" },
    { engName: "Christian", thName: "" },
    { engName: "Keith", thName: "" },
    { engName: "Roger", thName: "" },
    { engName: "Terry", thName: "" },
    { engName: "Gerald", thName: "" },
    { engName: "Harold", thName: "" },
    { engName: "Sean", thName: "" },
    { engName: "Austin", thName: "" },
    { engName: "Carl", thName: "" },
    { engName: "Arthur", thName: "" },
    { engName: "Lawrence", thName: "" },
    { engName: "Dylan", thName: "" },
    { engName: "Jesse", thName: "" },
    { engName: "Jordan", thName: "จอนแดน" },
    { engName: "Bryan", thName: "" },
    { engName: "Billy", thName: "" },
    { engName: "Joe", thName: "โจล์" },
    { engName: "Bruce", thName: "" },
    { engName: "Gabriel", thName: "" },
    { engName: "Logan", thName: "โรแกน" },
    { engName: "Albert", thName: "" },
    { engName: "Willie", thName: "" },
    { engName: "Alan", thName: "อลัน" },
    { engName: "Juan", thName: "" },
    { engName: "Wayne", thName: "เวร์น" },
    { engName: "Elijah", thName: "" },
    { engName: "Randy", thName: "แรนดี้" },
    { engName: "Roy", thName: "รอล์ย" },
    { engName: "Vincent", thName: "" },
    { engName: "Ralph", thName: "" },
    { engName: "Eugene", thName: "ยูจีน" },
    { engName: "Russell", thName: "" },
    { engName: "Bobby", thName: "" },
    { engName: "Mason", thName: "" },
    { engName: "Philip", thName: "" },
    { engName: "Louis", thName: "" },
    { engName: "Mary", thName: "" },
    { engName: "Patricia", thName: "" },
    { engName: "Jennifer", thName: "" },
    { engName: "Linda", thName: "" },
    { engName: "Elizabeth", thName: "" },
    { engName: "Barbara", thName: "" },
    { engName: "Susan", thName: "ซูซาน" },
    { engName: "Jessica", thName: "เจซซิก้า" },
    { engName: "Sarah", thName: "" },
    { engName: "Karen", thName: "" },
    { engName: "Lisa", thName: "ลิซ่า" },
    { engName: "Nancy", thName: "" },
    { engName: "Betty", thName: "" },
    { engName: "Margaret", thName: "" },
    { engName: "Sandra", thName: "" },
    { engName: "Ashley", thName: "" },
    { engName: "Kimberly", thName: "" },
    { engName: "Emily", thName: "เอ็มมิลี่" },
    { engName: "Donna", thName: "" },
    { engName: "Michelle", thName: "" },
    { engName: "Carol", thName: "" },
    { engName: "Amanda", thName: "อเมนดา" },
    { engName: "Dorothy", thName: "" },
    { engName: "Melissa", thName: "" },
    { engName: "Deborah", thName: "" },
    { engName: "Stephanie", thName: "สเตฟฟานี่" },
    { engName: "Rebecca", thName: "" },
    { engName: "Sharon", thName: "" },
    { engName: "Laura", thName: "" },
    { engName: "Cynthia", thName: "" },
    { engName: "Kathleen", thName: "" },
    { engName: "Amy", thName: "เอมี่" },
    { engName: "Angela", thName: "" },
    { engName: "Shirley", thName: "" },
    { engName: "Anna", thName: "แอนนา" },
    { engName: "Brenda", thName: "" },
    { engName: "Pamela", thName: "" },
    { engName: "Emma", thName: "เอมม่า" },
    { engName: "Nicole", thName: "นิโคล" },
    { engName: "Helen", thName: "เฮเลน" },
    { engName: "Samantha", thName: "" },
    { engName: "Katherine", thName: "แคทเทอรีน" },
    { engName: "Christine", thName: "" },
    { engName: "Debra", thName: "" },
    { engName: "Rachel", thName: "" },
    { engName: "Carolyn", thName: "" },
    { engName: "Janet", thName: "แจเน็ท" },
    { engName: "Catherine", thName: "แคทเทอร์รีน" },
    { engName: "Maria", thName: "มาเลีย" },
    { engName: "Heather", thName: "" },
    { engName: "Diane", thName: "ไดแอน" },
    { engName: "Ruth", thName: "" },
    { engName: "Julie", thName: "" },
    { engName: "Olivia", thName: "โอลิเวีย" },
    { engName: "Joyce", thName: "" },
    { engName: "Virginia", thName: "" },
    { engName: "Victoria", thName: "วิกตอร์เรีย" },
    { engName: "Kelly", thName: "เคลี่" },
    { engName: "Lauren", thName: "" },
    { engName: "Christina", thName: "" },
    { engName: "Joan", thName: "" },
    { engName: "Evelyn", thName: "เอเวิร์ลลีน" },
    { engName: "Judith", thName: "" },
    { engName: "Megan", thName: "เมแกน" },
    { engName: "Andrea", thName: "แอนเดรีย" },
    { engName: "Cheryl", thName: "เชอรี่" },
    { engName: "Hannah", thName: "" },
    { engName: "Jacqueline", thName: "" },
    { engName: "Martha", thName: "" },
    { engName: "Gloria", thName: "" },
    { engName: "Teresa", thName: "เทอรีซ่า" },
    { engName: "Ann", thName: "แอน" },
    { engName: "Sara", thName: "ซาลา" },
    { engName: "Madison", thName: "แมดิสัน" },
    { engName: "Frances", thName: "ฟราซ" },
    { engName: "Kathryn", thName: "" },
    { engName: "Janice", thName: "" },
    { engName: "Jean", thName: "" },
    { engName: "Abigail", thName: "อบิเกล" },
    { engName: "Alice", thName: "อลิส" },
    { engName: "Julia", thName: "จูเลีย" },
    { engName: "Judy", thName: "จูดี" },
    { engName: "Sophia", thName: "โซเพีย" },
    { engName: "Grace", thName: "เกรซ" },
    { engName: "Denise", thName: "" },
    { engName: "Amber", thName: "" },
    { engName: "Doris", thName: "ดอรีส" },
    { engName: "Marilyn", thName: "" },
    { engName: "Danielle", thName: "" },
    { engName: "Beverly", thName: "" },
    { engName: "Isabella", thName: "อิสซาเบล" },
    { engName: "Theresa", thName: "ทีเรสซ่า" },
    { engName: "Diana", thName: "ไดอานา" },
    { engName: "Natalie", thName: "นาตาลี" },
    { engName: "Brittany", thName: "" },
    { engName: "Charlotte", thName: "" },
    { engName: "Marie", thName: "มาลี" },
    { engName: "Kayla", thName: "เคล่า" },
    { engName: "Alexis", thName: "อเล็กซิส" },
    { engName: "Lori", thName: "รอลี" },
  ];
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    keys: ["engName", "thName"],
  };
  const fuse = new Fuse(nameList, options);

  function handleEnglishTextboxChange(event) {
    const txtBox = document.getElementById("eng-name");
    const foundNamesContainer = document.getElementById("found-names");
    const result = fuse.search(txtBox.value).filter((e) => {
      return e.score <= 0.4;
    });
    console.log(result);

    const template =
      "<% names.forEach(function({item}) { %> <li><%= item.engName %> : <%= item.thName %></li> <% }) %>";
    foundNamesContainer.innerHTML = ejs.render(template, { names: result });
  }

  let txtBox = document.getElementById("eng-name");
  txtBox.addEventListener("keyup", debounce(handleEnglishTextboxChange, 700));

  console.log("name-list: done init");
}

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    init();
  });
})();
