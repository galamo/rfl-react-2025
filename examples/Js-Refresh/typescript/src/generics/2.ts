interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

export type ApiResponse<T> =
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      data: T[];
    };

export function requestAdmins(
  callback: (response: ApiResponse<Admin>) => void
) {
  callback({
    status: "success",
    data: admins,
  });
}

// export function requestSomething<U>(callback: (response: ApiResponse<U>)) {
//     callback({
//         status: 'success',
//         data: []
//     });
// }

export function requestUsers(callback: (response: ApiResponse<User>) => void) {
  callback({
    status: "success",
    data: users,
  });
}
