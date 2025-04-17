import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const getButtonStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${theme.primary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.primary}e6;
        }
      `;
    case 'secondary':
      return `
        background-color: ${theme.secondary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.secondary}e6;
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${theme.primary};
        border: 1px solid ${theme.primary};
        &:hover {
          background-color: ${theme.primary}1a;
        }
      `;
    case 'text':
      return `
        background-color: transparent;
        color: ${theme.primary};
        border: none;
        &:hover {
          background-color: ${theme.primary}1a;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return `
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return `
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'large':
      return `
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

export const StyledButton = styled.button.attrs<ButtonProps>(({ variant = 'primary', size = 'medium', fullWidth = false }) => ({
  variant,
  size,
  fullWidth,
}))<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ variant = 'primary', theme }) => getButtonStyles(variant, theme)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default StyledButton;