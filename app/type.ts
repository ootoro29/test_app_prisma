import { z } from "zod";

export const zAirticle = z.object({    
    title:z.string(),
    content:z.string()
});
