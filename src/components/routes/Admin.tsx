import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";

const Admin = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { addNotification, removeLastNotification } = useApp();

  async function postProject(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t("login.err_usr_pass"));
      return;
    }

    try {
      console.log(title);
      console.log(description);
      console.log(tags);
      console.log(version);
    } catch (e) {
      setErrorMsg(t("login.err_inv_lgn"));
    } finally {
      removeLastNotification();
    }
  }

  function resetForm(event: FormEvent<HTMLFormElement>) {
    setErrorMsg("");
    setTitle("");
    setDescription("");
    setTags("");
    setVersion("");
  }

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTags(e: ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    onChangeAnyInput();
  }

  function onChangeVersion(e: ChangeEvent<HTMLInputElement>) {
    setVersion(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    return title !== "" && description !== "" && tags !== "" && version !== "";
  }

  function dismissError() {
    setErrorMsg("");
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("admin.header")}</TitleForm>
        <LoginPannel onSubmit={postProject} onReset={resetForm}>
          {errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          <LoginForm
            name="title"
            type="text"
            placeholder={t("admin.input_title")}
            value={title}
            onChange={onChangeTitle}
          />
          <LoginForm
            name="description"
            type="text"
            placeholder={t("admin.input_description")}
            value={description}
            onChange={onChangeDescription}
          />
          <LoginForm
            name="tags"
            type="text"
            placeholder={t("admin.input_tags")}
            value={tags}
            onChange={onChangeTags}
          />
          <LoginForm
            name="version"
            type="text"
            placeholder={t("admin.input_version")}
            value={version}
            onChange={onChangeVersion}
          />
          <ButtonWrapper>
            <ButtonForm
              type="submit"
              value={
                t("admin.button_accept") != null
                  ? (t("admin.button_accept") as string)
                  : "Publish"
              }
            />
            <ButtonCancel
              type="reset"
              value={
                t("admin.button_delete") != null
                  ? (t("admin.button_delete") as string)
                  : "Delete"
              }
            />
          </ButtonWrapper>
        </LoginPannel>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }

  @media (max-width: 500px) {
    justify-content: stretch;
    justify-items: stretch;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LoginPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
    padding: 20px;
  }
`;

const ErrorDescription = styled(Caption)`
  color: ${themes.light.warning};
`;

const LoginForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-gap: 10px;
  justify-content: end;

  @media (max-width: 500px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: stretch;
  }
`;

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.light.primary};
  }
`;

const ButtonCancel = styled(ButtonForm)`
  background-color: ${themes.light.warning};
`;

export default Admin;
