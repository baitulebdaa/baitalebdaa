import { serviceContent } from "../../../data/service-content";
const words = {
  en: {cta:"Discuss on WhatsApp",eyebrow:"Our services",heading:"What does your project need?",hero:"Interior Design in Dubai",links:["All services","Explore pricing"],replay:"Replay",labels:["Interior design","Fit-out","Joinery"]},
  ar: {cta:"ناقش مشروعك عبر واتساب",eyebrow:"خدماتنا",heading:"ماذا يحتاج مشروعك؟",hero:"تصميم داخلي في دبي",links:["جميع الخدمات","استعرض الأسعار"],replay:"إعادة",labels:["التصميم الداخلي","التجهيز الداخلي","النجارة"]}
};
export const demoCopy=Object.fromEntries(Object.entries(words).map(([lang,copy])=>[lang,{
  ...copy,faqs:serviceContent["interior-design"][lang].faqs,
  rows:["interior-design","fit-out","joinery"].map((slug,i)=>[copy.labels[i],serviceContent[slug][lang].summary])
}]));
