export const convertDate = (date: string) => {
    
    try {
        const convertedDate = new Date(date);

        if (convertedDate) {
          return convertedDate.toISOString();
        }
        } catch (error) {
    const firstFormat = new RegExp(/^\d{1,2}[-/\s]\d{1,2}[-/\s]\d{2,4}$/gm);

    if (firstFormat.test(date)) {
        
      const splitDate = date.split(/[-/ \s]/);
      return new Date(splitDate.reverse().join('/'))
    }

    return new Date().toISOString();        }


};