type Props = {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'inverted' | 'outline';
  onClick: () => void;
};

const baseClasses =
  'flex items-center justify-center gap-sm rounded-lg px-lg py-sm font-body-md text-body-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const variantClasses = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container',
  secondary:
    'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed',
  inverted:
    'bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant',
  outline:
    'border border-outline bg-surface-container-lowest text-on-surface hover:bg-surface-container',
};

function Button({ children, onClick, variant = 'primary' }: Props) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
