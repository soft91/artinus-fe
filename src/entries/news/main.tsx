import { RouterProvider } from "react-router-dom";

import { createSignupRouter } from "../../app/createSignupRouter";
import NewsSignup from "../../pages/signup/NewsSignup";
import NewsSignupComplete from "../../pages/signup/NewsSignupComplete";
import { bootstrap } from "../bootstrap.tsx";

const router = createSignupRouter(NewsSignup, NewsSignupComplete);

bootstrap(<RouterProvider router={router} />);
