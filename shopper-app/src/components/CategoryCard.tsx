import CustomCard from "./Card";
import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import {Grid} from "@mui/material";

export type Image = {
  image: string,
  description: string,
  title: string
}

export interface CategoryCardProps {
  images: Image[],
  title: string
}

export default function CategoryCard({images, title}: CategoryCardProps) {
  return (
    <CustomCard elevation={0} sx={{width:"auto", height: 'auto', margin: 1, alignItems: 'center', maxHeight: '100%', maxWidth: '300px', justifyContent: 'center', display: 'flex', flexGrow: 1}}>
      <Box
        sx={{
          display: 'grid',
          columnGap: 0.5,
          rowGap: 0.5,
          gridTemplateColumns: 'repeat(2, 1fr)',
          flexGrow: 1,
          m: 2
          }}
        alignItems='start'
        justifyContent='center'
      >
        <Typography sx={{ gridColumn: 'span 2', mb: 0.1}} align='left' variant='subtitle1'>
          {title}
        </Typography>
        {images.slice(0,4).map((image, key) => (
          <Box key={key+image.title} display="flex" flexDirection="column" alignItems="start" sx={{height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%'}}>
            <Box
              sx={{ maxWidth: '100%', width: 'auto', height: '100px', minHeight: '50px', objectFit: 'contain' }}
              component="img"
              src={image.image}
            />
            <Typography align='left' variant='caption'>
            {image.description.length > 13 ? `${image.description.slice(0, 12)}...` : image.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </CustomCard>
  )
}
