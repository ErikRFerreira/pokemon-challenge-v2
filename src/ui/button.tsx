import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'inverted'
  | 'outline'
  | 'favorite';

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick: () => void;
};

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
};

const baseClasses =
  'flex items-center justify-center gap-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const standardClasses =
  'rounded-lg px-lg py-sm font-body-md text-body-md font-medium';

const favoriteClasses =
  'group/favorite rounded-full px-md py-sm font-label-caps text-label-caps';

const variantClasses = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container',
  secondary:
    'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed',
  inverted:
    'bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant',
  outline:
    'border border-outline bg-surface-container-lowest text-on-surface hover:bg-surface-container',
  favorite:
    'border border-outline bg-surface-container-lowest/80 text-tertiary shadow-sm backdrop-blur-md hover:bg-surface-variant hover:text-primary',
};

function getButtonClasses(variant: ButtonVariant) {
  const shapeClasses =
    variant === 'favorite' ? favoriteClasses : standardClasses;

  return `${baseClasses} ${shapeClasses} ${variantClasses[variant]}`;
}

function Button({ children, onClick, variant = 'primary' }: Props) {
  return (
    <button
      className={getButtonClasses(variant)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = 'primary',
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClasses(variant)}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export default Button;
