import { RouterProvider } from "react-router-dom";

import { createSignupRouter } from "../../app/createSignupRouter";
import CommunitySignup from "../../pages/signup/CommunitySignup";
import CommunitySignupComplete from "../../pages/signup/CommunitySignupComplete";
import { bootstrap } from "../bootstrap.tsx";

const router = createSignupRouter(CommunitySignup, CommunitySignupComplete);

bootstrap(<RouterProvider router={router} />);
