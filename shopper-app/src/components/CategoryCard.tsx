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
    <CustomCard elevation={0} sx={{width:"auto", height: 'auto', margin: 1, minWidth: '200px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexGrow: 1}}>
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
        <Typography sx={{ gridColumn: 'span 2', mb: 1}} align='left' variant='subtitle1'>
          {title}
        </Typography>
        {images.slice(0,4).map((image) => (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              sx={{ maxWidth: '100%', maxHeight: '100%', width: '100px', height: 'auto', minHeight: '50px' }}
              component="img"
              src={image.image}
            />
            <Typography align='center' variant='caption'>
              {image.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </CustomCard>
  )
}