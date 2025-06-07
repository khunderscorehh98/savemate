import 'package:flutter/material.dart';

class AddDataScreen extends StatelessWidget {
  const AddDataScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Data')),
      body: const Center(
        child: Text('Add Data Screen'),
      ),
    );
  }
}

