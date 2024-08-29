
import { format } from "date-fns";


export const getEvents =  (user) => {

          const result= user?.map((item) => ({
      id: item.id.toString(),
      title: `${item.first_name} ${item.last_name}`,
      date: format(new Date(item.date), "yyyy-MM-dd"),
    }));
return result
}
