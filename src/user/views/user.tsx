
import { User } from "../user";
import { idAsString } from "../../utils/id-as-string";

export function UserView({ users }: { users: User[] }): string {
    return `
    <html lang="fr">
      <head><title>Liste des utilisateurs</title></head>
      <body>
        <h1>Utilisateurs</h1>
        <ul>
          ${users.map(u => `
            <li>
              <strong>${u.userName}</strong> (${u.email}) 
              — id: ${idAsString(u._id)}
            </li>
          `).join('')}
        </ul>
      </body>
    </html>
  `;
}