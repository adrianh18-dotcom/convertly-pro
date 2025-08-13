import { useState, useCallback, useRef } from 'react';

export interface QueueItem {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: any;
  error?: string;
}

const MAX_CONCURRENT = 3;

export const useProcessingQueue = () => {
  const [queue, setQueue] = useState<Map<string, QueueItem>>(new Map());
  const processingRef = useRef<Set<string>>(new Set());

  const addToQueue = useCallback((id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const item: QueueItem = {
        id,
        status: 'queued',
        progress: 0,
      };

      setQueue(prev => new Map(prev.set(id, item)));

      // Store the resolve/reject functions
      (item as any)._resolve = resolve;
      (item as any)._reject = reject;

      processNext();
    });
  }, []);

  const processNext = useCallback(() => {
    setQueue(current => {
      const processing = processingRef.current;
      
      if (processing.size >= MAX_CONCURRENT) {
        return current;
      }

      // Find next queued item
      const nextItem = Array.from(current.values()).find(
        item => item.status === 'queued'
      );

      if (!nextItem) {
        return current;
      }

      processing.add(nextItem.id);
      
      const updated = new Map(current);
      updated.set(nextItem.id, {
        ...nextItem,
        status: 'processing',
        progress: 10,
      });

      // Simulate processing
      setTimeout(() => {
        simulateProcessing(nextItem.id, updated.get(nextItem.id)!);
      }, 100);

      return updated;
    });
  }, []);

  const simulateProcessing = useCallback(async (id: string, item: QueueItem) => {
    try {
      // Simulate progress updates
      for (let progress = 20; progress <= 90; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setQueue(current => {
          const updated = new Map(current);
          const currentItem = updated.get(id);
          if (currentItem && currentItem.status === 'processing') {
            updated.set(id, { ...currentItem, progress });
          }
          return updated;
        });
      }

      // Complete the processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQueue(current => {
        const updated = new Map(current);
        const currentItem = updated.get(id);
        if (currentItem) {
          const completedItem = {
            ...currentItem,
            status: 'completed' as const,
            progress: 100,
            result: { success: true, message: 'Conversion completed' }
          };
          updated.set(id, completedItem);
          
          // Resolve the promise
          if ((currentItem as any)._resolve) {
            (currentItem as any)._resolve(completedItem.result);
          }
        }
        return updated;
      });

    } catch (error) {
      setQueue(current => {
        const updated = new Map(current);
        const currentItem = updated.get(id);
        if (currentItem) {
          const errorItem = {
            ...currentItem,
            status: 'error' as const,
            error: error instanceof Error ? error.message : 'Processing failed'
          };
          updated.set(id, errorItem);
          
          // Reject the promise
          if ((currentItem as any)._reject) {
            (currentItem as any)._reject(error);
          }
        }
        return updated;
      });
    } finally {
      processingRef.current.delete(id);
      processNext(); // Process next item in queue
    }
  }, [processNext]);

  const getQueueStatus = useCallback((id: string): QueueItem | undefined => {
    return queue.get(id);
  }, [queue]);

  const removeFromQueue = useCallback((id: string) => {
    setQueue(current => {
      const updated = new Map(current);
      updated.delete(id);
      return updated;
    });
  }, []);

  const getQueueSize = useCallback(() => {
    return Array.from(queue.values()).filter(item => 
      item.status === 'queued' || item.status === 'processing'
    ).length;
  }, [queue]);

  return {
    addToQueue,
    getQueueStatus,
    removeFromQueue,
    getQueueSize,
    queueItems: Array.from(queue.values()),
  };
};