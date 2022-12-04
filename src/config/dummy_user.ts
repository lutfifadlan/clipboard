import bcrypt from "bcrypt";

export const DummyUser = {
  username: "lutfifadlan",
  password: bcrypt.hashSync("Dummy123!", 10),
  full_name: "Mochamad Lutfi Fadlan",
};
