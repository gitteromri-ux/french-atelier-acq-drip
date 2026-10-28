document.addEventListener('click',async event=>{
 const button=event.target.closest('[data-copy-path],[data-copy-field]');
 if(!button)return;
 const original=button.textContent;
 try{
  let text='';
  if(button.dataset.copyField)text=document.getElementById(button.dataset.copyField).value;
  else{
   const response=await fetch(button.dataset.copyPath);
   if(!response.ok)throw new Error('Copy file unavailable');
   text=await response.text();
  }
  try{await navigator.clipboard.writeText(text);}
  catch{
   const field=document.createElement('textarea');
   field.value=text;field.setAttribute('aria-label','Copy this text');
   field.style.cssText='position:fixed;left:20px;top:20px;width:calc(100% - 40px);height:200px;z-index:99999';
   document.body.append(field);field.focus();field.select();
   if(!document.execCommand('copy')){button.textContent='Text selected';return;}
   field.remove();
  }
  button.textContent='Copied';
 }catch(error){button.textContent='Open the text file';console.error(error);}
});
