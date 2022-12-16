import { findUserByEmail } from '../src/services/auth.service';
import {
  getHobbyAndUser,
  getInfiniteHobbyAndUser,
} from '../src/services/hobby.service';

async function main() {
  // const result = await getHobbyAndUser({ hobbyName: 'soccer' });
  const res1 = await getHobbyAndUser({ hobbyName: 'soccer' });

  const result = await getInfiniteHobbyAndUser({
    hobbyName: 'soccer',
    hobbyId: 1,
    userProfileId: res1.UserHobby[res1.UserHobby.length - 1].user.id,
  });

  // console.log(JSON.stringify(result));
  console.log(JSON.stringify(res1));
  console.log(JSON.stringify(result));
}
('npx ts-node-dev --transpile-only test/hobby.service.test.ts');
main();

`
INSERT INTO users (email, password) VALUES ('test12@email.com', 'password'), ('test123@email.com', 'password'), ('test13@email.com', 'password'),('test14@email.com', 'password'),('test15@email.com', 'password'),('test17@email.com', 'password'),('test10@email.com', 'password'),('test112@email.com', 'password'),('test102@email.com', 'password');

INSERT INTO user_profile(username, userId) VALUES ('zulfikar21', 4), ('ros1adi', 5),('rosadi067', 6),('rosadi0', 7),('rosadi09', 8),('rosadi012', 9),('rosadi0121', 10),('rosadi076', 11),('rosadi10121', 12);

INSERT INTO hobbies (id, name) VALUES (1, 'soccer'), (2, 'programming'), (3, 'reading'), (4, 'swimming'), (5, 'writing'), (6, 'jogging'), (7, 'ghibah'), (8, 'julid'), (9, 'maen hp'), (10, 'netflix and chill'), (11, 'rebahan')

INSERT INTO user_hobbies (userId, hobbyId) VALUES (3,2), (3, 1),(3, 3),(3, 4),(3, 5),(3, 8),(3, 10),(3, 11),(3, 7)

INSERT INTO user_hobbies (userId, hobbyId) VALUES (2, 1),(1, 1);
`;
