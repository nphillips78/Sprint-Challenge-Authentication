<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions keep data that is only available to logged in users, data persists for requests for a certain amount of time.

2. What does bcrypt do to help us store passwords in a secure manner.
Salts the hash (not the food kind)

3. What does bcrypt do to slow down attackers?
Limits the speed of password hashing

4. What are the three parts of the JSON Web Token?
 * Header - includes type of token and the hashing algo being used
 * Payload - metadata and info about the user
 * Signature - encoded string that includes the payload and header and is used to verify that info is the same
