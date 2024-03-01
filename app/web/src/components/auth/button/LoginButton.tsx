/*
 * Copyright [2023] [Privacypal Authors]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use client";

import LoadingButton from "@components/form/LoadingButton";
import { signIn } from "next-auth/react";

interface LoginButtonProps {
  authManager: string;
  text?: string;
}

export const LoginButton = ({ authManager, text }: LoginButtonProps) => {
  return (
    <LoadingButton onClick={() => signIn(authManager)} className="auth-button">
      {text || `Sign in`}
    </LoadingButton>
  );
};
