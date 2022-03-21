Installation deno:

For Mac(homebrew): brew install deno
For windows(PowerShell): iwr https://deno.land/install.ps1 -useb | iex 
For Linux(Shell): curl -fsSL https://deno.land/install.sh | sh


Command for run project from source folder:
deno run --allow-all --unstable app.js


Address for using web application: http://localhost:7777/projects


For connection to database use follow settings(already included in database.js file):

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "abul.db.elephantsql.com",
  database: "fbdvksbh",
  user: "fbdvksbh",
  password: "PBdt7HMiddtPpzQKttFv9_prr9kxHZAx",
  port: 5432,
}, CONCURRENT_CONNECTIONS);