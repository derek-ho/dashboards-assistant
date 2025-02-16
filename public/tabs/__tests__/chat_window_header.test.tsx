/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { ChatWindowHeader, ChatWindowHeaderProps } from '../chat_window_header';
import * as chatContextExports from '../../contexts/chat_context';
import { TabId } from '../../types';

jest.mock('../../components/chat_window_header_title', () => {
  return { ChatWindowHeaderTitle: () => <div>OpenSearch Assistant</div> };
});

const setup = ({
  selectedTabId,
  ...props
}: Partial<ChatWindowHeaderProps> & { selectedTabId?: TabId } = {}) => {
  const useChatContextMock = {
    conversationId: '1',
    title: 'foo',
    selectedTabId: selectedTabId || 'chat',
    setConversationId: jest.fn(),
    setTitle: jest.fn(),
    setFlyoutVisible: jest.fn(),
    setSelectedTabId: jest.fn(),
    setFlyoutComponent: jest.fn(),
  };
  jest.spyOn(chatContextExports, 'useChatContext').mockReturnValue(useChatContextMock);
  const renderResult = render(
    <ChatWindowHeader flyoutFullScreen={false} toggleFlyoutFullScreen={jest.fn()} {...props} />
  );

  return {
    renderResult,
    useChatContextMock,
  };
};

describe('<ChatWindowHeader />', () => {
  it('should render title, history, fullscreen and close button', () => {
    const { renderResult } = setup();

    expect(renderResult.getByText('OpenSearch Assistant')).toBeInTheDocument();
    expect(renderResult.getByLabelText('history')).toBeInTheDocument();
    expect(renderResult.getByLabelText('fullScreen')).toBeInTheDocument();
    expect(renderResult.getByLabelText('close')).toBeInTheDocument();
  });

  it('should call setFlyoutVisible with false after close button clicked', () => {
    const { renderResult, useChatContextMock } = setup();

    expect(useChatContextMock.setFlyoutVisible).not.toHaveBeenCalled();
    fireEvent.click(renderResult.getByLabelText('close'));
    expect(useChatContextMock.setFlyoutVisible).toHaveBeenLastCalledWith(false);
  });

  it('should call setFlyoutComponent with undefined after history button click', () => {
    const { renderResult, useChatContextMock } = setup();

    expect(useChatContextMock.setFlyoutComponent).not.toHaveBeenCalled();
    fireEvent.click(renderResult.getByLabelText('history'));
    expect(useChatContextMock.setFlyoutComponent).toHaveBeenLastCalledWith(undefined);
  });

  it('should call setSelectedTabId with "chat" when selectedTabId is "history"', () => {
    const { renderResult, useChatContextMock } = setup({
      selectedTabId: 'history',
    });

    expect(useChatContextMock.setSelectedTabId).not.toHaveBeenCalled();
    fireEvent.click(renderResult.getByLabelText('history'));
    expect(useChatContextMock.setSelectedTabId).toHaveBeenLastCalledWith('chat');
  });

  it('should call setSelectedTabId with "history" when selectedTabId is "chat"', () => {
    const { renderResult, useChatContextMock } = setup({
      selectedTabId: 'chat',
    });

    expect(useChatContextMock.setSelectedTabId).not.toHaveBeenCalled();
    fireEvent.click(renderResult.getByLabelText('history'));
    expect(useChatContextMock.setSelectedTabId).toHaveBeenLastCalledWith('history');
  });

  it('should call toggleFullScreen after fullScreen clicked', () => {
    const toggleFlyoutFullScreenMock = jest.fn();
    const { renderResult } = setup({
      flyoutFullScreen: true,
      toggleFlyoutFullScreen: toggleFlyoutFullScreenMock,
    });

    expect(toggleFlyoutFullScreenMock).not.toHaveBeenCalled();
    fireEvent.click(renderResult.getByLabelText('fullScreen'));
    expect(toggleFlyoutFullScreenMock).toHaveBeenCalled();
  });
});
