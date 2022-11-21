export class CreateCatDto {
  img: [{ type: string; }];
  name: string;
  email: string;
  password: string;
}