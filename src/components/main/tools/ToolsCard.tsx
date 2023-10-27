import { Card, CardActions, CardContent } from '@mui/joy';
import { ReactNode } from 'react';

interface Tool {
  tool: {
    function: () => void;
    icon: ReactNode;
    name: string;
  };
}
export default function ToolsCard({ tool }: Tool) {
  return (
    <>
      <div onClick={tool.function}>
        <Card
          sx={{
            width: 100,
            height: 90,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, border 0.3s',
            textAlign:'center',

            '@media (min-width: 600px)': {
              // hover css for bigger screens only
              '&:hover': {
                backgroundColor: '#f0f4f8',
                transform: 'translateY(-2px)',
                cursor: 'pointer',
              },
            },
          }}>
          <CardContent>
            {tool.icon}
            <CardActions>
              <p>
                <small>{tool.name}</small>
              </p>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
