import{i as e,n as t,t as n}from"./jsx-runtime-bzQ4Vb5N.js";import{l as r,n as i,o as a,r as o}from"./index-B4vDfdtS.js";var s=e(t(),1),c=(e=10,t=`/`)=>{let[n,r]=(0,s.useState)(e),i=o();return(0,s.useEffect)(()=>{let e=setInterval(()=>{r(n=>n<=1?(clearInterval(e),i(t),0):n-1)},1e3);return()=>clearInterval(e)},[i,t]),{seconds:n}},l=(e,t,n,r)=>e===1?`1 ${t}`:e>=2&&e<=4?`${e} ${n}`:`${e} ${r}`,u=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({$fullHeight:e})=>e?`100vh`:`calc(100vh - 234px)`};
  padding: 40px 24px;
  text-align: center;
  background: ${({theme:e})=>e.background};
`,d=a.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({theme:e})=>e.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  color: ${({theme:e})=>e.accent};
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`,f=a.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({theme:e})=>e.text};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`,p=a.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme:e})=>e.textSecondary};
  margin-bottom: 8px;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,m=a.p`
  font-size: 14px;
  color: ${({theme:e})=>e.textSecondary};
  opacity: 0.7;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.8;

  @media (max-width: 480px) {
    font-size: 13px;
    max-width: 100%;
  }
`,h=a(i)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  border-radius: 12px;
  background: ${({theme:e})=>e.accent};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.accentHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.accent};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    width: 100%;
    justify-content: center;
  }
`,g=n(),_=({icon:e,title:t,subtitle:n,description:i,descriptionTimeKey:a,buttonText:o,redirectPath:s=`/`,redirectSeconds:_=10,fullHeight:v=!1,TitleComponent:y})=>{let{t:b}=r(),{seconds:x}=c(_,s),S=l(x,b(`declension.one`),b(`declension.two-four`),b(`declension.moreThanFour`));return(0,g.jsxs)(u,{$fullHeight:v,children:[e&&(0,g.jsx)(d,{children:e}),(0,g.jsx)(y||f,{children:t}),(0,g.jsx)(p,{children:n}),(0,g.jsxs)(m,{children:[i,(0,g.jsx)(`br`,{}),b(a,{seconds:S})]}),(0,g.jsx)(h,{to:s,children:o})]})},v=a.h1`
  font-size: 72px;
  font-weight: 700;
  color: ${({theme:e})=>e.accent};
  margin-bottom: 16px;
`,y=()=>{let{t:e}=r();return(0,g.jsx)(_,{title:e(`errors.notFound.title`),subtitle:e(`errors.notFound.subtitle`),description:e(`errors.notFound.description`),descriptionTimeKey:`errors.notFound.descriptionAboutTime`,buttonText:e(`errors.notFound.buttonTitle`),redirectPath:`/`,redirectSeconds:7,fullHeight:!0,TitleComponent:v})};export{y as NotFound};