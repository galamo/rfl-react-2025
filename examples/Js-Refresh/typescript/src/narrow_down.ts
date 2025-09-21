interface RegularUser {
  type: "user";
  name: string;
}

interface Admin {
  type: "admin";
  name: string;
  role: string;
}

type Person = RegularUser | Admin;
const admin: Person = {
  type: "admin",
  name: "gal",
  role: "admin",
};

const user: Person = {
  type: "user",
  name: "gal",
};
admin.role;

const employees = [admin, user];

function isAdmin(p: Person): p is Admin {
  return p.type == "admin";
  if ((p as Admin)?.role) {
    return true;
  }
  return false;
}

for (let index = 0; index < employees.length; index++) {
  const element = employees[index];
  if (isAdmin(element)) {
    console.log(element.role);
  } else {
    // console.log(element.role);
  }
}

// Narrow down example - p is Admin
