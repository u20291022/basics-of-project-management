class CyrillicTranslator {
  readonly alphabet = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"Y","В":"V","А":"А","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"y","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":" ","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":" ","б":"b","ю":"yu"};

  public transliterateToEnglish = (cyrillicString: string): string => {
    let result = ""

    for (let i = 0; i < cyrillicString.length; i++) {
      const char = cyrillicString[i]
      
      result += this.alphabet[char] || char
    }

    return result.replace(new RegExp(" ", "g"), "")
  }
}

export const cyrillicTranslator = new CyrillicTranslator()