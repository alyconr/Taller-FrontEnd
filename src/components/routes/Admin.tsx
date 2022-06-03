import React, {ChangeEvent,  FormEvent, useState} from 'react';
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";







const Admin = () => {

  
  
  const { t } = useTranslation();
 
  const { addNotification, removeLastNotification } = useApp();
  const [successMsg, setSuccessMsg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
 



  


      
  
 function doPost(event: FormEvent<HTMLFormElement>) {
  dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t("login.err_usr_pass"));
      return;
    }

    try {
      addNotification(t("loader.text"));
      const data = {
        title,
        description,
        link,
        tags,
        version
      };
      
    console.log(data);
    resetForm();
    setSuccessMsg(t("Successfully added"));
    setTimeout(() => { 
     removeLastNotification();
     setSuccessMsg("");
    }, 2000);
      
    } catch (e) {
      setErrorMsg(t("login.err_inv_lgn"));
    } finally {
      removeLastNotification();
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setLink("");
    setTags("");
    setVersion("");
    setDescription("");
    setSuccessMsg("");
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

  function onChangeLink(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
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
 // verify if the form is ready to submit  
  function readyToSubmit(): boolean {

    return title !== "" && description !== "" && link !== "" && tags !== "" && version !== "";
  }

  function dismissError() {
    setErrorMsg("");
  }

  
  return (
    <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("admin.header")} </TitleForm>
        { errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription> }
        { successMsg && <SuccessDescription>{successMsg}</SuccessDescription> }
        <FormPannel onSubmit={doPost}>
          <PostForm name="title"  type="text" placeholder ={t("admin.input_title")} value={title} onChange={onChangeTitle} />
          <PostForm name="description"  type="text" placeholder ={t("admin.input_description")} value={description} onChange={onChangeDescription} /> 
          <PostForm name="link"  type="url" placeholder ={t("admin.input_link")} value={link} onChange={onChangeLink} /> 
          <PostForm name="tags"  type="number" placeholder ={t("admin.input_tags")} value={tags} onChange={onChangeTags} />
          <PostForm name="version"  type="number" placeholder ={t("admin.input_version")} value={version} onChange={onChangeVersion} /> 
          <ButtonContainer>
          <ButtonPost type="submit" value={t("admin.button_accept") != null ? t("admin.button_accept") as string : "Post"}  /> 
          <ButtonDelete type="submit" value={t("admin.button_delete") != null ? t("admin.button_delete") as string : "Log In"}  />
          </ButtonContainer>
             
         
            
        </FormPannel>
       
       
      </ContentWrapper>
    
    </Wrapper>
   
  
     );


    }
  



    const SuccessDescription = styled(Caption)`
    color: ${themes.light.primary};
    `;





  const ButtonContainer = styled.div`
  
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
   margin: 0 auto;
  
 
 
  
  `;

  const ButtonPost = styled.input`
  width: 50%;
   margin: 0  0%;
   height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  &:hover {
    background-color: black;
    color: white;
  }

  &:active {
    background-color: ${themes.dark.primary};
    color: ${themes.light.text1};
    transform: scale(4px);
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;

const ButtonDelete = styled.input`
  width: 100%;
  margin: 0  42%;
   height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.warning};
  color: ${themes.dark.text1};


  &:hover {
    background-color: black;
    color: white;
  }

  &:active {
    background-color: ${themes.dark.primary};
    color: ${themes.light.text1};
    transform: scale(4px);
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.secondary};
  }
`;

  const ErrorDescription = styled(Caption)`

  color: ${themes.light.warning};


`;

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
`
const FormPannel = styled.form`

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

const PostForm = styled.input`
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

`


    

export default Admin;

