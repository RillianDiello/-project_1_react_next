import { render, screen } from '@testing-library/react';
import { PostCard } from '.';

const props = {
  title: 'title1',
  body: 'body 1',
  id: 1,
  cover: 'img/img.png',
};

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: 'title1' })).toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();

    expect(screen.getByText('body 1')).toBeInTheDocument();
  });
  it('should match with snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
