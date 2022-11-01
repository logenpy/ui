import * as React from "react";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { Button, Form as SemanticForm, Icon } from "semantic-ui-react";

import logo from "../../public/images/polygen.png";
import Layout from "./layout";
import type { action } from "~/routes/register";

export default function AuthBox({ type }: { type: "login" | "register" }) {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const actionData = useActionData<typeof action>();

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const repeatPasswordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.repeatPassword) {
      repeatPasswordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Layout type="text" cur={type}>
      <div className="flex justify-center sm:my-auto">
        <Form className="ui large form max-sm:w-full" method="post" action={`/${type}`}>
          <SemanticForm.Field>
            <img src={logo} alt="logo" className="mx-auto" />
          </SemanticForm.Field>

          <SemanticForm.Field>
            <div className="ui left icon input">
              <input
                ref={usernameRef}
                required
                autoFocus={true}
                name="username"
                type="username"
                placeholder="用户名"
                aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
              />
              <Icon name="user" />
            </div>
            {actionData?.errors?.username && (
              <div className="pt-1 text-red-700" id="username-error">
                {actionData.errors.username}
              </div>
            )}
          </SemanticForm.Field>

          <SemanticForm.Field>
            <div className="ui left icon input">
              <input
                ref={passwordRef}
                required
                name="password"
                type="password"
                placeholder="密码"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              <Icon name="lock" />
            </div>
            {actionData?.errors?.password && (
              <div className="pt-1 text-red-700" id="password-error">
                {actionData.errors.password}
              </div>
            )}
          </SemanticForm.Field>

          {type === "register" &&
            <SemanticForm.Field>
              <div className="ui left icon input">
                <input
                  ref={repeatPasswordRef}
                  required
                  name="repeatPassword"
                  type="password"
                  placeholder="再次输入密码"
                  aria-invalid={actionData?.errors?.repeatPassword ? true : undefined}
                  aria-describedby="repeatPassword-error"
                />
                <Icon name="lock" />
              </div>
              {actionData?.errors?.repeatPassword && (
                <div className="pt-1 text-red-700" id="repeatPassword-error">
                  {actionData.errors.repeatPassword}
                </div>
              )}
            </SemanticForm.Field>
          }

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button fluid primary size="large" type="submit">
            {type === "login" ? "登录" : "注册"}
          </Button>

          <div className="text-center">
            <hr className="h-0.5 bg-slate-200 borderless my-3.5" />
            <SemanticForm.Field className="text-sm">
              {type === "login" ?
                <>
                  没有账号？
                  <Link to="/register">注册</Link>
                </>
                :
                <>
                  已有账号？
                  <Link to="/login">登录</Link>
                </>
              }
            </SemanticForm.Field>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
