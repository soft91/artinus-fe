import { RouterProvider } from "react-router-dom";

import { createSignupRouter } from "../../app/createSignupRouter";
import ShoppingSignup from "../../pages/signup/ShoppingSignup";
import ShoppingSignupComplete from "../../pages/signup/ShoppingSignupComplete";
import { bootstrap } from "../bootstrap.tsx";

const router = createSignupRouter(ShoppingSignup, ShoppingSignupComplete);

bootstrap(<RouterProvider router={router} />);
