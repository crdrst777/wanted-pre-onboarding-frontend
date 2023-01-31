export default interface SignUpType {
  email: string;
  password: string;
  checkPassword: string;
}

export default interface SignInType {
  email: string;
  password: string;
}

export default interface TodoListType {
  id: number;
  title: string;
  completed: boolean;
}
