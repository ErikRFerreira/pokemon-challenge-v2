import Button from '@/ui/button';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  buttonText: string;
};

function Empty({ title, description, buttonText }: Props) {
  const navigate = useNavigate();
  return (
    <div className="mt-xl py-xl flex flex-col items-center justify-center text-center  pt-xl">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant w-full max-w-[24rem] mx-auto mb-lg">
        {description}
      </p>
      <Button variant="primary" size="compact" onClick={() => navigate('/')}>
        {buttonText}
      </Button>
    </div>
  );
}

export default Empty;
